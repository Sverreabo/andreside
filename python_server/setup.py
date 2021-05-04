from setuptools import setup
from Cython.Build import cythonize

setup(
    name='vigenere_master_cython',
    ext_modules=cythonize("vigenere_master_cython.pyx"),
    zip_safe=False,
)
