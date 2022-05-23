import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import FieldInput from "./FieldInput";
import postEvent from "../api/postEvent";

const EventSchema = Yup.object().shape({
  name: Yup.string().trim().required().label("Name"),
  time: Yup.string().trim().required().label("Time"),
  location: Yup.string().trim().required().label("Location"),
});

const EventForm = ({ date }) => {
  const [_, setFormData] = React.useState({});

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-2/3 p-2 flex justify-center items-center flex-col space-y-4">
        <div className="text-2xl font-bold">Add new Event</div>
        <Formik
          validationSchema={EventSchema}
          initialValues={{ name: "", time: "", location: "" }}
          onSubmit={(values) => {
            const id = Math.random().toString(32).slice(2);
            postEvent({ ...values, id, date });
          }}
        >
          {({ handleSubmit }) => (
            <form
              className="w-full flex flex-col text-lg space-y-4"
              onSubmit={handleSubmit}
            >
              <FieldInput
                label="Name"
                name="name"
                onBlur={(value) =>
                  setFormData((state) => ({
                    ...state,
                    name: value,
                  }))
                }
              />
              <FieldInput
                label="Time"
                name="time"
                onBlur={(value) =>
                  setFormData((state) => ({
                    ...state,
                    time: value,
                  }))
                }
              />
              <FieldInput
                label="Location"
                name="location"
                onBlur={(value) =>
                  setFormData((state) => ({
                    ...state,
                    location: value,
                  }))
                }
              />
              <button
                className="rounded bg-white text-black w-full mx-auto py-1"
                type="submit"
              >
                Submit!
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventForm;
