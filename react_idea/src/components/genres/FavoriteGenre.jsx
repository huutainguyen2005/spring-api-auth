import {Button, Card, CardBody} from "react-bootstrap";
import {useState} from "react";

export function FavoriteGenre() {
    // Khai báo thông tin số lượt like xử lý
    // state faved
    // sate là dữ liệu nội bộ của Component (private)

    // ex: int faved = 0

    // Cú pháp
    // const [currentValue, setterFn] = useState(initialValue)

    const [faved, setFaved] = useState(0);

    // Call api để đếm số lượt like của Genre
    // -> state = result.count // wrong
    // set state phải dùng fn setter
    // -> setFaved(result.count) // correct way

    return (
        <Card>
            <CardBody>
                <Card.Title>Genre XYZ</Card.Title>
                <Card.Subtitle>{faved} likes</Card.Subtitle>
                <Card.Text>
                    No of tracks: 80
                </Card.Text>
            </CardBody>
            <Button onClick={() => {
                if (faved === 13) {
                    setFaved(79);
                } else {
                    setFaved((faved) => faved + 1);
                }
            }}>
                Like
            </Button>
        </Card>
    );
}