import streamlit as st
import json

with open('data.json', 'r') as file:
    existing_data = json.load(file)

st.title('Add Event Data')

event_id = st.text_input('Event ID')
poster_image = st.text_input('Poster Image URL')
cover_image = st.text_input('Cover Image URL')
event_name = st.text_input('Event Name')
event_description = st.text_input('Event Description')
event_date = st.text_input('Event Date')
club_name = st.text_input('Club Name')
club_post = st.text_input('Club Post')

if st.button('Add Event'):
    new_event = {
        "id": event_id,
        "poster_image": poster_image,
        "cover_image": cover_image,
        "event_name": event_name,
        "event_description": event_description,
        "event_date": event_date,
        "club_name": club_name,
        "club_post": club_post
    }

    existing_data.append(new_event)

    with open('data.json', 'w') as file:
        json.dump(existing_data, file, indent=4)

    st.success('Event added successfully!')

st.subheader('Current Data')
st.json(existing_data)
