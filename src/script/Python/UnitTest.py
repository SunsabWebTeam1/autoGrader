import unittest

def test_suite(uploaded_module):
    class TestAddFunction(unittest.TestCase):
        def test_add_positive_numbers(self):
            self.assertEqual(uploaded_module.add(1, 2), 3)

        def test_add_negative_numbers(self):
            self.assertEqual(uploaded_module.add(-1, -2), -3)

        def test_add_mixed_numbers(self):
            self.assertEqual(uploaded_module.add(5, -3), 2)

        def test_add_zero(self):
            self.assertEqual(uploaded_module.add(0, 1), 0)

    return unittest.TestLoader().loadTestsFromTestCase(TestAddFunction)