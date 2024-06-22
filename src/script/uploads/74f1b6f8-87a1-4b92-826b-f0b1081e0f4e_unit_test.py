import unittest
import logging
from sqlalchemy import text

logging.basicConfig(level=logging.INFO)

def test_suite(uploaded_queries, db_engine):
    class TestSQLQueries(unittest.TestCase):
        def setUp(self):
            self.connection = db_engine.connect()
            logging.info("Database connection established.")

        def tearDown(self):
            self.connection.close()
            logging.info("Database connection closed.")

        def test_select_first_query(self):
            try:
                query = uploaded_queries[0]
                logging.info(f"Executing query: {query}")
                result = self.connection.execute(text(query)).fetchall()
                logging.info(f"Query result: {result}")
                expected = [('Anna', 'Chapman'), ('Valerie', 'Plume')]
                self.assertEqual(result, expected)
            except Exception as e:
                logging.error(f"Error executing first query: {str(e)}")
                raise

        def test_select_second_query(self):
            try:
                query = uploaded_queries[1]
                logging.info(f"Executing query: {query}")
                result = self.connection.execute(text(query)).fetchall()
                logging.info(f"Query result: {result}")
                expected = [('Paris Culture Tour',), ('Paris Highlights',)]
                self.assertEqual(result, expected)
            except Exception as e:
                logging.error(f"Error executing second query: {str(e)}")
                raise

        def test_select_third_query(self):
            try:
                query = uploaded_queries[2]
                logging.info(f"Executing query: {query}")
                result = self.connection.execute(text(query)).fetchall()
                logging.info(f"Query result: {result}")
                expected = [
                    ('Canada', '2-Hour Horseback Trail Ride in Kananaskis'),
                    ('Canada', 'Blackshale Suspension Bridge & Sightseeing Tour'),
                    ('Canada', 'Calgary City Sightseeing Tour'),
                    ('Canada', 'Calgary Stampede - Chuckwagon Races and Grandstand Show'),
                    ('Canada', 'Calgary Stampede - Day pass Rodeo'),
                    ('Canada', 'Calgary to Royal Tyrell Museum | Drumheller | Badland – Private Sightseeing Tour'),
                    ('Canada', 'Cycling the Bow'),
                    ('Canada', 'Heritage Park - the 1883 experience'),
                    ('Canada', 'Lake Louise & Yoho N.P & Moraine Lake 1-Day Tour from Calgary or Banff'),
                    ('Canada', 'Rock climbing at COP'),
                    ('Canada', 'Rocky Mountaineer - 3 Day Train Adventure'),
                    ('Canada', 'Sulfur Mountain Gondola and Banff Hot Springs'),
                    ('Canada', 'Voyageur Canoe Tour'),
                    ('United States', 'ATV / UTV Riding - 28-Mile Jackrabbit Tour for 2 Riders'),
                    ('United States', 'Beginner Group Rock Climbing in Joshua Tree National Park'),
                    ('United States', 'Disneyland 2-Day Park Hopper Ticket'),
                    ('United States', 'Earthquake Canyon Express Downhill Bicycle Adventure'),
                    ('United States', 'Modern & More Bike Tours Palm Springs'),
                    ('United States', 'Palm Springs Art Museum Guided Tour'),
                    ('United States', 'Palm Springs On/Off City Tour'),
                    ('United States', 'Palm Springs Windmill Tours'),
                    ('United States', 'Private Dolphin and Whale Watching Tour in Newport Beach'),
                    ('United States', 'Private French-Inspired Cooking Class with a Fun Local in Palm Springs, CA'),
                    ('United States', 'Private Surf Lesson Newport Beach, California'),
                    ('United States', 'San Andreas Fault Jeep Tour from Palm Desert')
                ]
                self.assertEqual(result, expected)
            except Exception as e:
                logging.error(f"Error executing third query: {str(e)}")
                raise

    return unittest.TestLoader().loadTestsFromTestCase(TestSQLQueries)
