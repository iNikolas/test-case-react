import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onPost("/auth").reply(function (config) {
  let userData;
  if (config.data) userData = JSON.parse(config.data);
  if (userData?.username === "test" && userData?.password === "666666")
    return generateRespond(200, 0, 1);
  return generateRespond(200, 1, null, ["Wrong authorization data"]);
});

function generateRespond(
  status: number,
  resCode: number,
  id: number | null,
  messages: Array<string> = []
) {
  return [
    status,
    {
      resultCode: resCode,
      messages: messages,
      data: {
        userId: id,
      },
    },
  ];
}
