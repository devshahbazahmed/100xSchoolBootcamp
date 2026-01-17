function ProfileCardComponent() {
    return (
        <div style={{ backgroundColor: "#fff", display: "flex", flexDirection: "column", borderRadius: "10px", justifyContent: "center", width: "200px", padding: "30px" }}>
            <div style={{ backgroundColor: "gray", height: "60px", width: '260px', marginLeft: "-30px", borderRadius: "10px", marginTop: "-30px" }}></div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "-20px" }}>
                <img src={"https://media.licdn.com/dms/image/v2/D4D03AQFTMSKTJDERcA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728482036160?e=1742428800&v=beta&t=YcJ8Nke7npOW11wRKEelbF9GoUO3oKbGrZisRgxj_Gg"} style={{ width: "50px", height: "50px", borderRadius: "50px" }} />
            </div>
            <div style={{ textAlign: "center" }}>
                <h3>Shahbaz Ansari</h3>
                <p style={{ fontSize: "10px", color: "gray" }}>Working with 100xdevs</p>
                <div style={{ border: "1px solid gray" }}></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Profile Viewers</p>
                    <p style={{ color: "blue" }}>40,687</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Post Impressions</p>
                    <p style={{ color: "blue" }}>1,208</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileCardComponent;