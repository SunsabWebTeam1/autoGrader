import unittest

def test_suite(uploaded_module):
    class TestFunctions(unittest.TestCase):
        def test_fibonacci_sequence_small(self):
            self.assertEqual(uploaded_module.fibonacci_sequence(5), [0, 1, 1, 2, 3])

        def test_fibonacci_sequence_large(self):
            self.assertEqual(uploaded_module.fibonacci_sequence(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34])

        def test_fibonacci_sequence_zero(self):
            self.assertEqual(uploaded_module.fibonacci_sequence(0), [])

        def test_fibonacci_sequence_negative(self):
            with self.assertRaises(ValueError):
                uploaded_module.fibonacci_sequence(-5)

    return unittest.TestLoader().loadTestsFromTestCase(TestFunctions)