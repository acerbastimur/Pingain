export default class ReadCampaignQr {
  static readCampaignQr(
    userId: string,
    companyId: string,
    campaignId: string,
    scannedQrId: string,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      fetch(
        `https://us-central1-pingain-app.cloudfunctions.net/readCampaignQr?scannedQrId=${scannedQrId}&userId=${userId}&campaignId=${campaignId}&companyId=${companyId}`,
        requestOptions,
      )
        .then(response => {
          if (response.status === 200 || response.status === 302) return resolve(response.status);
          return reject(response.status);
        })
        .catch(error => reject(error));
    });
  }
}
