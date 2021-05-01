alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅabcdefghijklmnopqrstuvwxyzæøå .,?-_;:+1234567890"'
alphabet_length = len(alphabet)


def vigenere_encode(msg, key):
    """Function that encodes a string with Vigenere cipher. The encrypted
        string is returned. """

    secret = ""

    key_length = len(key)

    for i, char in enumerate(msg):
        msgInt = alphabet.find(char)
        encInt = alphabet.find(key[i % key_length])
        if msgInt == -1 or encInt == -1:
            print(f"Failed to encrypt letter '{char}'")
            secret += "?"
        else:
            encoded = (msgInt + encInt) % alphabet_length
            secret += alphabet[encoded]

    return secret


def vigenere_decode(secret, key):
    """Function that decodes a string with Vigenere cipher. The decrypted
        string is returned. """

    msg = ""

    key_length = len(key)

    for i, char in enumerate(secret):
        secretInt = alphabet.find(char)
        decInt = alphabet.find(key[i % key_length])

        if secretInt == -1 or decInt == -1:
            print(f"Failed to decrypt letter '{char}'")
            msg += "?"
        else:
            decoded = (secretInt - decInt) % alphabet_length
            msg += alphabet[decoded]

    return msg


if __name__ == "__main__":
    from os import system

    message = input("Enter text: ")
    if message == "":
        message = 'My first computer program was a song called Popcorn written in QBasic. The second computer program I made was a bot made for IRC.'

    keyword = input("Enter key: ")
    if keyword == "":
        keyword = "source"
    encrypted = vigenere_encode(message, keyword)
    decrypted = vigenere_decode(encrypted, keyword)
    print(f'Encrypted: {encrypted}')
    print(f'Decrypted: {decrypted}')
    system("pause >nul")
