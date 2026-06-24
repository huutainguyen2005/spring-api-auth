import {Button, Card} from "react-bootstrap";
import {useState} from "react";

export function FavoriteGenre() {
    // Khai báo thông tin số lượt like để xử lý
    // state faved
    // state là dữ liệu nội bộ (private) của Component
    // Cú pháp
    // const [currentValue, setterFn] = useState(initialValue)
    const [faved, setFaved] = useState(0);
    // Call api de dem so luot like cua genre
    // -> state = result.count // wrong
    // set state phải dùng fn setter
    // -> setFaved(result.count) // correct way
    return (
        <Card>
            <Card.Body>
                <Card.Title>Genre XYZ</Card.Title>
                <Card.Subtitle>{faved} likes</Card.Subtitle>
                <Card.Text>
                    No of tracks: 80
                </Card.Text>
                <Button onClick={() => {
                    if (faved === 13) {
                        setFaved(79);
                    } else {
                        setFaved(faved + 1);
                    }
                }}>
                    Like
                </Button>
            </Card.Body>
        </Card>
    );
}