// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const scenarios = [

      {
        daemonCard: 
        {
          description: "Four of Disks",
          power: "4D"
        },
        playerCards: 
        [
          {
            description: "Five of Wands",
            power: "5W"},
          {
            description: "Three of Cups",
            power: "3C"},
          {
            description: "Two of Swords",
            power: "2S"}
        ]
      } 

    ];

    return {
      statusCode: 200,
      body: JSON.stringify(scenarios),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
