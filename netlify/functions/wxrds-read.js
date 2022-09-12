
const faunadb = require('faunadb'); 
const { getId } = require('./utils.js');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  
  const id = getId(event.path);
  console.log(`Function 'wxrds-read' invoked. Read id: ${id}`);
  
  return client.query(q.Get(q.Ref(`classes/wxrds/${id}`)))
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
