import { useState } from "react"; 
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/footer/Footer";
import RenderInput from "../../Layout/RenderInput";
import Button from "../../Components/button";
import styles from "./PartnerInterest.module.css";

import schoolCollegeIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/School.png";
import corporateBrandIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Bag.png";
import ngoFoundationIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Hand.png";
import sportsClubIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Club.png";
import individualFreelancerIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Individual.png";
import hostEventIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Host.png";
import sponsorTournamentsIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Sponsor.png";
import promoteMediaIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Mic.png";
import supportResourcesIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Location.png";
import csrIcon from "../../assets/Sponsor/Formicon/PartnerFormIcon/Csr.png";

import axios from "axios";


const TYPE_OPTIONS = [
  { id: "school_college", label: "School / College", iconSrc: schoolCollegeIcon },
  { id: "corporate_brand", label: "Corporate / Brand", iconSrc: corporateBrandIcon },
  { id: "ngo_foundation", label: "NGO / Foundation", iconSrc: ngoFoundationIcon },
  { id: "sports_club", label: "Sports Club / Association", iconSrc: sportsClubIcon },
  { id: "individual_freelancer", label: "Individual / Freelancer", iconSrc: individualFreelancerIcon },
];

const OPTION = [
  { id: "host_events", label: "Host or co-organize events", iconSrc: hostEventIcon },
  { id: "sponsor_tournaments", label: "Sponsor tournaments or initiatives", iconSrc: sponsorTournamentsIcon },
  { id: "promote_media", label: "Promote BOS through media", iconSrc: promoteMediaIcon },
  { id: "support_resources", label: "Support with resources or venues", iconSrc: supportResourcesIcon },
  { id: "csr_engagement", label: "CSR or community engagement", iconSrc: csrIcon },
];

export default function PartnerInterest() {
  return (
    <div>
      <Navbar />
      <PartnerBond />
      <FormBody />
      <Footer />
    </div>
  );
}

function PartnerBond() {
  return (
    <section className={styles.partnerBondSection}>
      <h1 className={styles.partnerBondTitleLarge}>Partner with Bond Over Sports</h1>
      <h2 className={styles.partnerBondTitleMedium}>Let’s Build a Movement. Together.</h2>
      <h3 className={styles.partnerBondParagraph}>
        We collaborate with institutions, brands, NGOs, clubs, and changemakers
        who believe in the power of sports to bring people together and
        celebrate cultural legacy. If you’re passionate about impact, youth
        engagement, and community development — we’d love to hear from you.
      </h3>
    </section>
  );
}

function FormBody() {
  const [organizationName, setOrganizationName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [selectedOrgType, setSelectedOrgType] = useState("");
  const [selectedInterestTypes, setSelectedInterestTypes] = useState([]);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
  };

  const chooseOrgType = (typeId) => {
    setSelectedOrgType(typeId);
  };

  const toggleInterestType = (typeId) => {
    setSelectedInterestTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((t) => t !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      // build FormData instead of JSON
      const form = new FormData();
      form.append("organisation_name", organizationName);
      form.append("name", name);
      form.append("phone", mobileNumber);
      form.append("email", email);
      form.append("type", selectedOrgType);
      // send each interest as interests[]
      selectedInterestTypes.forEach((interest) =>
        form.append("interests[]", interest)
      );
      form.append("query", description);

      await axios.post(
        "http://154.26.130.161/hswf/api/partner/interests",
        form,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      // reset form
      setOrganizationName("");
      setName("");
      setEmail("");
      setMobileNumber("");
      setSelectedOrgType("");
      setSelectedInterestTypes([]);
      setDescription("");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.formBodySection}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.formHeadingLarge}>Partner Interest Form</h1>

        <div className={styles.section}>
          <h2 className={styles.formSubHeading}>Organization Info</h2>
          <RenderInput
            label="Organization/Brand Name"
            name="organizationName"
            type="text"
            placeholder="Enter Organization/Brand Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          <RenderInput
            label="Your Name"
            name="name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <RenderInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.mobileInputWrapper}>
            <label htmlFor="mobileNumber" className={styles.mobileInputLabel}>
              Mobile Number <span>*</span>
            </label>
            <div className={styles.mobileInputGroup}>
              <span className={styles.mobileInputCountry}>+91</span>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                placeholder="Enter Mobile Number"
                className={styles.mobileInputField}
              />
            </div>
          </div>
        </div>

        <div className={styles.stsWrapper}>
          <h2 className={styles.stsHeading}>Type of Organization</h2>
          <p className={styles.stsDescription}>Choose one:</p>
          <div className={styles.stsOptions}>
            {TYPE_OPTIONS.map(({ id, label, iconSrc }) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseOrgType(id)}
                className={`${styles.stsBtn} ${
                  selectedOrgType === id ? styles.stsBtnSelected : ""
                }`}
              >
                <img
                  src={iconSrc}
                  alt={label}
                  className={styles.stsBtnIconImg}
                />
                <span className={styles.stsBtnLabel}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.stsWrapper}>
          <h2 className={styles.stsHeading}>Area of Interest</h2>
          <p className={styles.stsDescription}>You can select more than one</p>
          <div className={styles.stsOptions}>
            {OPTION.map(({ id, label, iconSrc }) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleInterestType(id)}
                className={`${styles.stsBtn} ${
                  selectedInterestTypes.includes(id)
                    ? styles.stsBtnSelected
                    : ""
                }`}
              >
                <img
                  src={iconSrc}
                  alt={label}
                  className={styles.stsBtnIconImg}
                />
                <span className={styles.stsBtnLabel}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.formSubHeading}>Message / Proposal (Optional)</h2>
          <p className={styles.smallNote}>
            Share any brief proposal or interest point
          </p>
          <RenderInput
            label="Message"
            name="description"
            type="text"
            placeholder="Write here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isTextarea
          />
        </div>

        <Button
          className={styles.submitButton}
          text={loading ? "Submitting..." : "Submit"}
          type="submit"
          disabled={loading}
        />

        {success && (
          <div className={styles.successMessage}>
            Form submitted successfully!
          </div>
        )}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
    </section>
  );
}
