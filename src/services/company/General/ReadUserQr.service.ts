export default class ReadUserQr {
  static readUserQrService(
    userId: string,
    campaignId: string,
    scannedQrId: string,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      fetch(
        `https://us-central1-pingain-app.cloudfunctions.net/readPrizeQr?userId=${userId}&campaignId=${campaignId}&scannedQrId=${scannedQrId}`,
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
