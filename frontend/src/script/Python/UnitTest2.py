import unittest

def test_suite(uploaded_module):
    class TestFunctions(unittest.TestCase):
        def test_reverse_words_simple(self):
            self.assertEqual(uploaded_module.reverse_words("hello world"), "orld hello")

        def test_reverse_words_with_punctuation(self):
            self.assertEqual(uploaded_module.reverse_words("Python is amazing!"), "amazing! is Python")

        def test_reverse_words_with_multiple_spaces(self):
            self.assertEqual(uploaded_module.reverse_words("   Hello   world   "), "world Hello")

        def test_reverse_words_empty_string(self):
            self.assertEqual(uploaded_module.reverse_words(""), "")

        def test_reverse_words_single_word(self):
            self.assertEqual(uploaded_module.reverse_words("Python"), "Python")

    return unittest.TestLoader().loadTestsFromTestCase(TestFunctions)

