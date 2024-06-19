# find the maximum element in an array, and then we'll write unit tests to ensure its correctness.
def find_maximum(arr):
    if not arr:
        return None
    max_value = arr[0]
    for num in arr:
        if num > max_value:
            max_value = num
    return max_value