-- #1
SELECT first_name "FIRST_NAME", last_name "LAST_NAME" 
from rcv_agent 
where agent_level='III' OR agent_level='IV' AND NOT agent_speciality='CA';
-- #2
SELECT tour_description "TOUR_DESCRIPTION" 
from rcv_vacation_tour 
where rating_code='E' OR rating_code='M' AND tour_description like '%Paris%' ORDER BY tour_description;
-- #3
SELECT country "COUNTRY", dest_description "DEST_DESCRIPTION" 
from rcv_destination 
where country='Canada' OR country='United States' ORDER BY country,dest_description;