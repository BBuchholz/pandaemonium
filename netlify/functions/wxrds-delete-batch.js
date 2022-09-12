
const faunadb = require('faunadb'); 
const { getId } = require('./utils.js');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  
  const data = JSON.parse(event.body);
  console.log('data', data);
  console.log(`Function 'wxrds-delete-batch' invoked.`, data.ids);
  
  const deleteAllMatchingWxrdsQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(`classes/wxrds/${id}`));
  });

  return client.query(deleteAllMatchingWxrdsQuery)
    .then((response) => {
      console.log("success", response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    });
}
