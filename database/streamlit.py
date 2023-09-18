import streamlit as st
import json

def store_data(data):
    with open("data.txt", "a") as file:
        file.write(json.dumps(data) + '\n')

st.title("Event Data Entry and Storage")

id = st.text_input("ID")
poster_image = st.text_input("Poster Image URL")
cover_image = st.text_input("Cover Image URL")
event_name = st.text_input("Event Name")
event_description = st.text_input("Event Description")
event_date = st.date_input("Event Date")
club_name = st.text_input("Club Name")
club_post = st.text_input("Club Post")

if st.button("Submit"):
    event_data = {
        "id": id,
        "poster_image": poster_image,
        "cover_image": cover_image,
        "event_name": event_name,
        "event_description": event_description,
        "event_date": str(event_date),
        "club_name": club_name,
        "club_post": club_post
    }

    store_data(event_data)
    
    st.json(event_data)
