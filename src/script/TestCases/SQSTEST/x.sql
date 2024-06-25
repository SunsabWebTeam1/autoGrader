rem Unit 10-11 Lab Simple Select and sorting data
rem 


set linesize 100
rem set pagesize 66
set echo on

spool "C:\cprg250s\Really Cheap Vacations.txt"

rem 1. Display all agents who specialize in US travel packages. Sort by last name.

SELECT first_name "FIRST_NAME", last_name "LAST_NAME" 
from rcv_agent 
where agent_level='III' OR agent_level='IV' AND NOT agent_speciality='CA';

rem 2. Find all tours in France and Spain that cost $100 or less. Sort by country, state, city and price. Line width should be 160, the destination desc column should be 80 characters, country 15 characters and city 10 characters wide. 

SELECT tour_description "TOUR_DESCRIPTION" 
from rcv_vacation_tour 
where rating_code='E' OR rating_code='M' AND tour_description like '%Paris%' ORDER BY tour_description;

rem 3. Find all customers in California with a phone number that starts with a ‘310’ area code. Sort by last name and first name.
rem column dest_description FORMAT A80
rem column country FORMAT A15


SELECT country "COUNTRY", dest_description "DEST_DESCRIPTION" 
from rcv_destination 
where country='Canada' OR country='United Stats' ORDER BY country,dest_description;

spool off

