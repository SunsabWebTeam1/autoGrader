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
                expected = [('Hunt', 'Ethan', 'II'), ('Plume', 'Valerie', 'IV')]
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
                expected = [
                    ('French Riviera Famous Cities Scoot Coupe Self Drive Tour from Nice', 'France', None, 'Nice', 96.13),
                    ('French Riviera in One Day', 'France', None, 'Nice', 89.26),
                    ('Nice Small-Group Walking Food Tour with Local Specialties & Wine Tasting', 'France', None, 'Nice', 96.13),
                    ('Bateaux Parisiens Seine River Cruise', 'France', None, 'Paris', 75.75),
                    ('Disneyland Paris 1-Day Ticket', 'France', None, 'Paris', 76.90),
                    ('Familia Sagrada Guided Tour', 'Spain', None, 'Barcelona', 70.03),
                    ('Interactive Spanish Cooking Experience in Barcelona', 'Spain', None, 'Barcelona', 72.76),
                    ('Sunset Jazz Cruise in Barcelona', 'Spain', None, 'Barcelona', 49.95)
                ]
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
                    ( 'Raj', 'Koothrappali', '310.285.9002', 'CA'), 
                    ('Bernadette', 'Rostenkowski-Wolowitz', '310.285.9000', 'CA')
                ]
                self.assertEqual(result, expected)
            except Exception as e:
                logging.error(f"Error executing third query: {str(e)}")
                raise

    return unittest.TestLoader().loadTestsFromTestCase(TestSQLQueries)
