module.exports = async function(){
    const colUsers = global.utils.dbmg.db('api').collection('users');
    await colUsers.createIndex({email: 1}, {unique: true});
    await colUsers.createIndex( { name: "text", email: "text" } )
};
