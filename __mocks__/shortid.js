const shortid = jest.genMockFromModule('shortid');

function *ids(value = 1) {
  while(true)
    yield value++;
}

let idIterator = ids();

const __resetId__ = (value = 1) => {
  idIterator = ids(value);
}

const generate = () => {
  return idIterator.next().value;
}

shortid.generate = generate;
shortid.__resetId__ = __resetId__;
export default shortid;
