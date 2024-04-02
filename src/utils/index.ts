export const formatDate = (date:string) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    const convertedDate = new Date(date);
  
    const dayOfWeek = daysOfWeek[convertedDate.getDay()];
    const dayOfMonth = convertedDate.getDate();
    const month = months[convertedDate.getMonth()];
    const year = convertedDate.getFullYear();
  
    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
  };