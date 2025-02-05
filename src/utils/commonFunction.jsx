export function sharePost(url) {
    const handleShare = async () => {
      if (navigator.share) {
        try {
          // console.log("Sharing...");
  
          const shareUrl = url;
  
          await navigator.share({
            title: "RBlogs", 
            text: "This is an awesome page!", 
            url: shareUrl, 
          });
  
          // console.log('Share successful!');
        } catch (err) {
          console.error("Error while sharing:", err);
        }
      } else {
        alert("Sharing not supported on this browser.");
      }
    };
  
    handleShare();
  }