import * as dynamoose from "dynamoose";

dynamoose.aws.sdk.config.update({
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 region: process.env.AWS_REGION,
});

const User = new dynamoose.Schema({
 name: String,
 SecondName: String,
 age: Number,
});

//gerar numero aleatório
function geraStringAleatoria(tamanho: Number) {
 var stringAleatoria = "";
 var caracteres =
  "0123456789!@#$%&*qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
 for (var i = 0; i < tamanho; i++) {
  stringAleatoria += caracteres.charAt(
   Math.floor(Math.random() * caracteres.length)
  );
 }
 return stringAleatoria;
}

const FeedBack = dynamoose.model("FeedBack", {
 message: String,
 name: { type: String, required: false },
 id: {
  type: String,
  default: geraStringAleatoria(10),
 },
});
export const UserModel = dynamoose.model("User", User);

export default FeedBack;
