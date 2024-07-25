exports.getTitle =  (wpm) => {
    if (wpm >= 100) {
      return "Super Typer";
    } else if (wpm < 100 && wpm >= 50) {
      return "Ultra Legend";
    } else if (wpm < 50 && wpm >= 30) {
      return "Legend";
    } else if (wpm < 30 && wpm > 20) {
      return "Bigainer";
    }
    return "Noob";
}