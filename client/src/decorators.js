export const fileHandler = {
  priority: 0,
  async decorate(value) {
    if (value.constructor && value.constructor === File) {
      const {
        name, lastModified, size, type,
      } = value;
      const arrayBuffer = await value.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), ''),
      );
      return {
        name, lastModified, size, type, base64,
      };
    }
    return value;
  },
};

export const fileListHandler = {
  priority: 0,
  async decorate(value) {
    if ((value.constructor && value.constructor === FileList) || value.length) {
      const results = [];
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < value.length; i++) {
        results.push(await fileHandler.decorate(value[i]));
      }
      /* eslint-enable no-await-in-loop */
      return results;
    }
    return value;
  },
};
