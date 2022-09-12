
const faunadb = require('faunadb'); /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  
  console.log(`Function 'wxrds-read-all' invoked.`);
  
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all_wxrds"))))
    .then((response) => {
      const wxrdRefs = response.data
      console.log("wxrd refs", wxrdRefs)
      console.log(`${wxrdRefs.length} wxrds found`)
      // create new query out of wxrd refs. http://bit.ly/2LG3MLg
      const getAllWxrdDataQuery = wxrdRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllWxrdDataQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    });
}
