const { Etcd3 } = require('etcd3');

const host = process.env.DB_HOST;
console.log('db host: ', host);

let client;
if ( host ) {
    client = new Etcd3({hosts:host});
} else {
    client = new Etcd3();
}

const getAllKeys = async () => {
    const allFKeys = await client.getAll().keys();
    console.log('all keys:', allFKeys);
    return allFKeys;
}

const getAllValues = async () => {
    const allValues = await client.getAll().strings();
    console.log('all keys-values:', allValues);
    return allValues;
}

const getKey = async (key) => {
    const val = await client.get(key).string();
    console.log(key, ' is ', val);
    return val;
}

const setKey = async (key, value) => {
    const res = await client.put(key).value(value);
    console.log('set ', key, ' to ', value, ' => ', res);
    return res;
}

const deleteKey = async (key) => {
    const res = await client.delete().key(key).exec();
    console.log('delete ', key, ' => ', res);
    return res;
}
 
// (async () => {
//   await client.put('foo').value('bar');

//   await client.put('msg2').value('test msg2');
 
//   const fooValue = await client.get('foo').string();
//   console.log('foo was:', fooValue);
 
//   const allFValues = await client.getAll().prefix('f').keys();
//   console.log('all our keys starting with "f":', allFValues);

//   const allFValues2 = await client.getAll().keys();
//   console.log('all our keys:', allFValues2);

//   const allFValues2Str = await client.getAll().strings();
//   console.log('all our keys as text:', allFValues2Str);

//   const allFValues2Json = await client.getAll().json;
//   console.log('all our keys as JSON:', allFValues2Json);
 
// //   await client.delete().all();
// })();

module.exports = {
    getAllKeys,
    getAllValues,
    getKey,
    setKey,
    deleteKey
}