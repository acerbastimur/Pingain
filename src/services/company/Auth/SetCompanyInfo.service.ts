import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import GetCompanyInfoService from '../General/GetCompanyInfo.service';

export default class SetCompanyInfoService {
  static setCompanyInfo(
    adminName: string,
    companyName: string,
    phoneNumber: string,
    instagramAccount: string,
    companyLogoUri: string,
  ): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const companyUid = auth().currentUser.uid;
      const uploadLogo = await this.uploadCompanyLogoToStorage(companyLogoUri, companyUid);

      const currentCompanyCollection = firestore()
        .collection('companies')
        .doc(companyUid);

      currentCompanyCollection
        .update({
          adminName,
          companyName,
          instagramAccount,
          phoneNumber,
          companyLogo: uploadLogo.metadata.fullPath,
        })
        .then(async () => {
          await GetCompanyInfoService.getCompanyInfo(); // to update store
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async uploadCompanyLogoToStorage(photoUri: string, companyUid: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', photoUri, true);
      xhr.send(null);
    });

    const ref = storage()
      .ref()
      .child(`companies/${companyUid}/companyLogo.png`);
    return ref.put(blob);
  }

  static async uploadCompanyPhotosToStorage(
    companyImages: Array<string>,
    companyUid: string,
  ): Promise<Array<string>> {
    const urls = await Promise.all(
      companyImages.map(async (image, index) => {
        if (image !== null) {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
              resolve(xhr.response);
            };
            xhr.onerror = () => {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
          });

          const ref = storage()
            .ref()
            .child(`companies/${companyUid}/companyPhotos/photo${index}.png`);
          const path = (await ref.put(blob)).metadata.fullPath;
          return path;
        }
        return null;
      }),
    );

    return urls.filter(url => url != null);
  }

  static updateCompanyDetails(
    companyName: string,
    adminName: string,
    phoneNumber: string,
    instagramAccount: string,
    address = '',
    city = '35',
    companyFeatures: [],
    companyImages: Array<string>,
    companyLogo: string,
  ): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const companyUid = auth().currentUser.uid;

      if (companyLogo) {
        await this.uploadCompanyLogoToStorage(companyLogo, companyUid);
      }
      const uploadedCompanyImages = await this.uploadCompanyPhotosToStorage(
        companyImages,
        companyUid,
      );
      const companyLogoPath = `companies/${companyUid}/companyLogo.png`;

      const currentCompanyCollection = firestore()
        .collection('companies')
        .doc(companyUid);

      await currentCompanyCollection
        .update({
          adminName,
          companyName,
          instagramAccount,
          phoneNumber,
          companyFeatures,
          companyImages: uploadedCompanyImages,
          city,
          address,
          companyLogo: companyLogoPath,
        })
        .then(() => {
          GetCompanyInfoService.getCompanyInfo(); // to update store
        });
      resolve(true);
    });
  }
}
