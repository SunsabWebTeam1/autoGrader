# Python/test_suite.py
import pytest

def test_add_positive_numbers(uploaded_module):
    assert uploaded_module.add(1, 2) == 3

def test_add_negative_numbers(uploaded_module):
    assert uploaded_module.add(-1, -2) == -3

def test_add_mixed_numbers(uploaded_module):
    assert uploaded_module.add(5, -3) == 2

def test_add_zero(uploaded_module):
    assert uploaded_module.add(0, 1) == 1