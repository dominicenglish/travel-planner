const APIClient = jest.genMockFromModule('../ApiClient.js');
APIClient.default.prototype.get = jest.genMockFunction();
APIClient.default.prototype.post = jest.genMockFunction();
APIClient.default.prototype.put = jest.genMockFunction();
APIClient.default.prototype.delete = jest.genMockFunction();
export default APIClient.default;
