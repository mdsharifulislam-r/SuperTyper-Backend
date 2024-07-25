exports.getAvarage =  (data)=>{
      let wpm = [];
        let acc = [];
        let cpm = [];
        data?.forEach((item) => {
          wpm.push(item.wpm);
          acc.push(item.acc);
          cpm.push(item.cpm);
        });
        return {
          wpm: Math.floor(
            wpm.reduce((prev, cur) => {
              return prev + cur;
            }, 0) / wpm.length
          ) ||0,
          acc: Math.floor(
            acc.reduce((prev, cur) => {
              return prev + cur;
            }, 0) / acc.length
          ) ||0,
          cpm: Math.floor(
            cpm.reduce((prev, cur) => {
              return prev + cur;
            }, 0) / cpm.length
          ) ||0,
        };
}