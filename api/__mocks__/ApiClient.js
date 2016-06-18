// const APIClient = jest.genMockFromModule('../ApiClient.js');
// APIClient.default.prototype.get = jest.genMockFunction();
// APIClient.default.prototype.post = jest.genMockFunction();
// APIClient.default.prototype.put = jest.genMockFunction();
// APIClient.default.prototype.delete = jest.genMockFunction();
let api = {
  get: jest.genMockFunction(),
  post: jest.genMockFunction(),
  put: jest.genMockFunction(),
  delete: jest.genMockFunction(),
}
const singleton = () => {
  return api;
}
export default singleton;
// export default APIClient.default;
