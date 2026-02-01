import React from "react";
import Input from "../../../components/Inputs/Input";

const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-800">
        Contact Information
      </h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          {/*<Input
            value={profileData.fullName || ""}
            onChange={({ target }) =>
              updateSection("fullName", target.value)
            }
            label="Full Name"
            placeholder="Manvansh"
            type="text"
          /> */}
        <Input
          label="Address"
          placeholder="Short Address"
          type="text"
          value={contactInfo.location || ""}
          onChange={({ target }) =>
            updateSection("location", target.value)
          }
        />
        </div>

        <Input
          label="Email"
          placeholder="mv@example.com"
          type="email"
          value={contactInfo.email || ""}
          onChange={({ target }) =>
            updateSection("email", target.value)
          }
        />

        <Input
          label="Phone Number"
          placeholder="+91 1234567890"
          type="text"
          value={contactInfo.phone || ""}
          onChange={({ target }) =>
            updateSection( "phone", target.value)
          }
        />

        <Input
          label="LinkedIn"
          placeholder="linkedin.com/in/username"
          type="text"
          value={contactInfo.linkedin || ""}
          onChange={({ target }) =>
            updateSection( "linkedin", target.value)
          }
        />

        <Input
          label="GitHub"
          placeholder="github.com/username"
          type="text"
          value={contactInfo.github || ""}
          onChange={({ target }) =>
            updateSection( "github", target.value)
          }
        />
        <div className="md:col-span-2">
            
        <Input
          label="Portfolio / Website"
          placeholder="yourwebsite.com"
          type="text"
          value={contactInfo.website || ""}
          onChange={({ target }) =>
            updateSection( "website", target.value)
          }
        />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
