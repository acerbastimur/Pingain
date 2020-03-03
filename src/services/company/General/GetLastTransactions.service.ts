import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LastTransaction from '../../../schemes/company/LastTransactions';

export default class GetLastTransactionsService {
  static async getLastTransactions(): Promise<Array<LastTransaction>> {
    const { uid } = auth().currentUser;
    const lastTransactionsRef = firestore()
      .collection('lastTransactions')
      .where('companyId', '==', uid)
      .get();
    if ((await lastTransactionsRef).empty) return null;
    const lastTransactions = (await lastTransactionsRef).docs.map(doc => {
      return doc.data() as LastTransaction;
    });

    return lastTransactions;
  }
}
