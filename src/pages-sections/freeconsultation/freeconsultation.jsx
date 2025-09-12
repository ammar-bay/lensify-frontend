import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import axios from "utils/axios";

const FreeConsultation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    age: "",
    address: "",
    gender: "",
    appointmentDate: "",
    appointmentTime: "",
    preferredContact: "",
    referral: "",
    reason: "",
    consent: false,
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  // Calculate age automatically
  useEffect(() => {
    if (formData.dob) {
      const birth = dayjs(formData.dob);
      const today = dayjs();
      const years = today.diff(birth, "year");
      setFormData((prev) => ({ ...prev, age: years >= 0 ? years : "" }));
    } else {
      setFormData((prev) => ({ ...prev, age: "" }));
    }
  }, [formData.dob]);

  // Fetch booked slots for selected date
  useEffect(() => {
    const fetchBooked = async () => {
      if (!formData.appointmentDate) return;
      try {
        const res = await axios.get(
          `/appointments?date=${formData.appointmentDate}`
        );
        setBookedTimes(
          res.data.map((appt) =>
            dayjs(appt.appointmentDateTime).format("h:mm A")
          )
        );
      } catch (err) {
        console.error("Could not fetch booked slots", err);
        setBookedTimes([]);
      }
    };
    fetchBooked();
  }, [formData.appointmentDate]);

  // Generate available time slots
  useEffect(() => {
    if (!formData.appointmentDate) return;

    const slots = [];
    const selectedDate = dayjs(formData.appointmentDate);
    const now = dayjs();
    const nowPlus3 = now.add(3, "hour");

    for (let hour = 9; hour <= 22; hour++) {
      ["00", "15", "30", "45"].forEach((minute) => {
        let slot = dayjs(selectedDate)
          .hour(hour)
          .minute(parseInt(minute))
          .second(0);

        // Skip past times if today
        if (selectedDate.isSame(now, "day") && slot.isBefore(nowPlus3)) return;

        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? "AM" : "PM";
        const formattedTime = `${formattedHour}:${minute} ${ampm}`;

        if (!bookedTimes.includes(formattedTime)) {
          slots.push(formattedTime);
        }
      });
    }

    setAvailableTimes(slots);
  }, [formData.appointmentDate, bookedTimes]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/appointments", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      enqueueSnackbar("Appointment booked successfully", {
        variant: "success",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        dob: "",
        age: "",
        address: "",
        gender: "",
        appointmentDate: "",
        appointmentTime: "",
        preferredContact: "",
        referral: "",
        reason: "",
        consent: false,
      });
      setBookedTimes([]);
    } catch (err) {
      const msg = err.response?.data?.message || "Server error";
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Book Free Eye Consultation
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* DOB */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: dayjs().format("YYYY-MM-DD") }}
            />
          </Grid>

          {/* Age */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Appointment Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Preferred Appointment Date"
              name="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
              required
            />
          </Grid>

          {/* Appointment Time */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Preferred Time</InputLabel>
              <Select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Select</MenuItem>
                {availableTimes.map((time, idx) => (
                  <MenuItem key={idx} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Preferred Contact */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Preferred Contact Method</InputLabel>
              <Select
                name="preferredContact"
                value={formData.preferredContact}
                required
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="WhatsApp">WhatsApp</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Referral */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>How did you hear about us?</InputLabel>
              <Select
                name="referral"
                value={formData.referral}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Google">Google</MenuItem>
                <MenuItem value="Social Media">Social Media</MenuItem>
                <MenuItem value="Friend/Family">Friend/Family</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Reason */}
          <Grid item xs={12}>
            <TextField
              label="Reason for Consultation"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>

          {/* Consent & Submit */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                }
                label="I agree to share my data for consultation *"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Button type="submit" variant="contained" size="large" color="primary">
                Book Appointment
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FreeConsultation;
