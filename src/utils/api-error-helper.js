export default function errorParse (response) {
  return JSON.parse(response.text).message;
}
