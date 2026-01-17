import PropTypes from 'prop-types';

// structuring your app into components - reusabale elements of UI which returns self-contained JS XML.
// defining a state of your application

function PostComponent({ imageUrl, name, subTitle, time, description }) {
    return <div style={{ width: "200px", backgroundColor: "#fff", borderColor: "gray", borderWidth: "1px", borderRadius: "10px", display: "flex", flexDirection: "column", padding: "20px" }}>
        <div style={{ display: "flex" }}>
            <img src={imageUrl} style={{ width: "50px", height: "50px", borderRadius: "50px" }} />
            <div style={{ fontSize: "10px", marginLeft: "10px" }}>
                <b>{name}</b>
                <div>{subTitle}</div>
                <div>
                    {time && (
                        <>
                            {time}
                            <img src={'https://media.istockphoto.com/id/931336618/vector/clock-vector-icon-isolated.jpg?s=612x612&w=0&k=20&c=I8EBJl8i6olqcrhAtKko74ydFEVbfCQ6s5Pbsx6vfas='} width={12} height={12} />
                        </>
                    )}

                </div>
            </div>

        </div>
        <div style={{ fontSize: "12px" }}>
            {description}
        </div>
    </div>;
}


PostComponent.propTypes = {
    name: PropTypes.string,
    subTitle: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
};

export default PostComponent;


