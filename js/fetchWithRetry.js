const fetchWithRetry = (url) => {
    return new Promise((resolve, reject) => {
        let attempts = 1;
        
        // Recursive calls
        const fetch_retry = (url, n) => {
            return fetch(url).then(resolve).catch(function (error) {
                if (n === 1) 
                    reject(error)
                else
                    setTimeout(() => {
                        attempts ++
                        fetch_retry(url, n - 1);
                    }, attempts * 3000)
                });
        }   
        
        // 5 is curried
        return fetch_retry(url, 5);
    });
  }