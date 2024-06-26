rem Lab Unit 10-11 Simple SELECT and Sorting 
set echo on
set linesize 100
set pagesize 66
spool c:/cprg250s/unit10-11LabOutput.ltxt

rem Q1 - basic select columns with headers

SELECT last_name, first_name, agent_level 
FROM rcv_agent 
WHERE agent_speciality = 'US' 
ORDER BY last_name;

rem Q2

SELECT dest_description, country, state, city, price 
FROM rcv_destination 
WHERE (country = 'France' OR country = 'Spain') AND price <= 100 
ORDER BY country, city, dest_description, price;

rem Q3 

SELECT first_name, last_name, customer_phone, customer_province 
FROM rcv_customer 
WHERE customer_province = 'CA' AND customer_phone LIKE '310%' 
ORDER BY last_name, first_name;


spool off