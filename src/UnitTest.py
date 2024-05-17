
import unittest
class TestAddFunction(unittest.TestCase):

    # Test cases
    def test_add_positive_numbers(self):
        self.assertEqual(add(1, 2), 3)  # Test addition of two positive numbers

    def test_add_positive_and_negative(self):
        self.assertEqual(add(-1, 1), 0)  # Test addition of a positive and a negative number

    def test_add_negative_numbers(self):
        self.assertEqual(add(-1, -1), -2)  # Test addition of two negative numbers

    def test_add_numberstest1(self):
        self.assertEqual(add(2, 3), 7)  # Test addition of two negative numbers

        
# Required for running the tests
if __name__ == '__main__':
    unittest.main(argv=[''], exit=False)