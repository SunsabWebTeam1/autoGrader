# test_algorithm.py

import unittest

def test_suite(uploaded_module):
    class TestFindMaximum(unittest.TestCase):
        def test_find_maximum_regular_case(self):
            arr = [1, 2, 3, 4, 5]
            self.assertEqual(uploaded_module.find_maximum(arr), 5)

        def test_find_maximum_negative_numbers(self):
            arr = [-1, -2, -3, -4, -5]
            self.assertEqual(uploaded_module.find_maximum(arr), -1)

        def test_find_maximum_reversed_order(self):
            arr = [5, 4, 3, 2, 1]
            self.assertEqual(uploaded_module.find_maximum(arr), 5)

        def test_find_maximum_empty_array(self):
            arr = []
            self.assertIsNone(uploaded_module.find_maximum(arr))

    return unittest.TestLoader().loadTestsFromTestCase(TestFindMaximum)