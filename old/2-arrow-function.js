const event = {
  name: "birthday Party",
  guestList: ["david", "john", "mori"],
  printGuestList() {
    console.log("Guest list for " + this.name);
    this.guestList.forEach((guest) => {
      console.log(guest + "is invited for " + this.name);
    });
  },
};
event.printGuestList();
