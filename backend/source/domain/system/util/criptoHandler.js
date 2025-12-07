import crypto from 'crypto';
import "dotenv/config";

const IV_LENGTH = 16;

export function criptografar(texto) {

    if (!process.env.SECRET_EXERCISE_KEY || process.env.SECRET_EXERCISE_KEY.length !== 32) {
        throw new Error("A chave SECRET_EXERCISE_KEY no .env precisa ter exatamente 32 caracteres.");
    }

    let iv = crypto.randomBytes(IV_LENGTH)
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_EXERCISE_KEY), iv);

    let encrypted = cipher.update(texto);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');

}


export function descriptografar(textoCriptografado) {

    if (!process.env.SECRET_EXERCISE_KEY || process.env.SECRET_EXERCISE_KEY.length !== 32) {
        throw new Error("A chave SECRET_EXERCISE_KEY no .env precisa ter exatamente 32 caracteres.");
    }
    
    let textParts = textoCriptografado.split(':')
    let iv = Buffer.from(textParts.shift(), 'hex')
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_EXERCISE_KEY), iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}