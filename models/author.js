const { DateTime } = require("luxon");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//Virtual for authors full name
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

//Virtual for authors lifespan
AuthorSchema.virtual("lifespan").get(function () {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

AuthorSchema.virtual("years_lived").get(function () {
  let birth = this.date_of_birth;
  let death = this.date_of_death;

  if (birth == null && death == null) {
    return "unknown";
  } else if (death == null && birth !== null) {
    return new Date(birth).getFullYear();
  } else if (death !== null) {
    return (
      new Date(this.date_of_death).getFullYear() - new Date(birth).getFullYear()
    );
  }
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
