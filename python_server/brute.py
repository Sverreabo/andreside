try:
    from vigenere_master_cython import vigenere_encode, vigenere_decode, alphabet
except:
    from vigenere_master import vigenere_encode, vigenere_decode, alphabet
from multiprocessing import current_process

# def ioc(string: str):
#     """Alternative to number_of_valid words. """

#     string_set = set(string)
#     frequencies = dict()
#     for x in string_set:
#         frequencies.update({x: string.count(x)})
#     return sum(frequencies.values()) / len(frequencies)


def number_of_valid_words(string: str,
                          dictionary,
                          splitcharacters: str = '.,?-_;:+"'):

    string = string.lower()
    for char in splitcharacters:
        string = string.replace(char, " ")
    string = string.split()

    num = 0

    for word in string:
        if word == "":
            continue
        if word in dictionary:
            num += 1

    return num


class solution_class:
    def __init__(self, secret: str, key: str, dictionary):
        self.string = vigenere_decode(secret, key)
        self.key = key
        self.score = number_of_valid_words(self.string, dictionary)

    def __repr__(self):
        return self.string


if current_process().name == "MainProcess":
    from multiprocessing import Pool
    from itertools import repeat
    from os import cpu_count
    cpu_count = cpu_count()

    def uses_valid_letters(word: str):
        for x in word:
            if not x in alphabet:
                return False
        return True

    def sort_strings(solutions: list):
        solutions.sort(key=lambda x: x.score, reverse=True)
        return solutions

    def brute(secret, keylenght=0):
        if keylenght == 0:
            keys = dictionary
        else:
            keys = frozenset([x for x in dictionary if len(x) == keylenght])

        print(f"\t{len(keys)} possible keys loaded from dictionary")

        arguments = zip(repeat(secret), keys, repeat(dictionary))
        with Pool(processes=cpu_count) as pool:
            solutions = pool.starmap(solution_class, arguments)

        print("\tSolutions successfully generated")
        return solutions

    with open("words.txt", "r") as f:
        dictionary = frozenset(
            [x[:-1].lower() for x in f if uses_valid_letters(x[:-1])])

    if __name__ == "__main__":
        from multiprocessing import freeze_support
        freeze_support()
        from time import time
        from sys import argv
        allow_stop = not (len(argv) >= 2 and argv[1] == "-nostop")

        secret = ""

        if allow_stop:
            secret = input("Secret: ")
        if secret == "":
            secret = 'q0Ø:;AI"E47FRBQNBG4WNB8B4LQN8ERKC88U8GEN?T6LaNBG4GØ""N6K086HB"Ø8CRHW"+LS79Ø""N29QCLN5WNEBS8GENBG4FØ47a'

        print("Generating solutions...")
        t0 = time()
        solutions = brute(secret)
        print(f"\tGenerated in {time() - t0}")
        print("\nSorting solutions...")
        t0 = time()
        solutions = sort_strings(solutions)
        print(f"\tSolutions sorted in {time() - t0}. Outputting:\n")

        if allow_stop:
            searchstring = None  # For debugging
            for i, solution in enumerate(solutions):
                if searchstring != None and solution.string[:len(
                        searchstring)] != searchstring:
                    continue

                print(f"{solution.key} | {solution.score}: {solution.string}")
                if i % 20 == 0 and i != 0:
                    input("---- Press enter to continue ----")
