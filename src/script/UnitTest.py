import unittest
  # Import the module containing the functions to be tested

def test_suite(uploaded_module):
    class TestFunctions(unittest.TestCase):
        def test_add_positive_numbers(self):
            self.assertEqual(uploaded_module.add(1, 1), 3)

        def test_add_negative_numbers(self):
            self.assertEqual(uploaded_module.add(-1, -2), -3)

        def test_add_mixed_numbers(self):
            self.assertEqual(uploaded_module.add(5, -3), 2)

        def test_multiply_positive_numbers(self):
            self.assertEqual(uploaded_module.multiply(3, 4), 12)

        def test_multiply_negative_numbers(self):
            self.assertEqual(uploaded_module.multiply(-3, -4), 12)

        def test_multiply_mixed_numbers(self):
            self.assertEqual(uploaded_module.multiply(-5, 3), -15)

    return unittest.TestLoader().loadTestsFromTestCase(TestFunctions)