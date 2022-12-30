use std::ops;

#[derive(Copy, Clone, Debug)]
struct Vec3 {
    x: f32,
    y: f32,
    z: f32
}

impl ops::Add for Vec3 {
    type Output = Vec3;

    fn add(self, v: Vec3) -> Self::Output {
        Vec3 {
            x: self.x + v.x,
            y: self.y + v.y,
            z: self.z + v.z
        }
    }
}

impl ops::Sub for Vec3 {
    type Output = Vec3;

    fn sub(self, v: Vec3) -> Self::Output {
        Vec3 {
            x: self.x - v.x,
            y: self.y - v.y,
            z: self.z - v.z
        }
    }
}

impl ops::Mul<f32> for Vec3 {
    type Output = Vec3;

    fn mul(self, v: f32) -> Self::Output {
        Vec3 {
            x: self.x * v,
            y: self.y * v,
            z: self.z * v
        }
    }
}

impl ops::Div<f32> for Vec3 {
    type Output = Vec3;

    fn div(self, v: f32) -> Self::Output {
        Vec3 {
            x: self.x / v,
            y: self.y / v,
            z: self.z / v
        }
    }
}

impl ops::Neg for Vec3 {
    type Output = Vec3;

    fn neg(self) -> Self::Output {
        Vec3 {
            x: -self.x,
            y: -self.y,
            z: -self.z
        }
    }
}

impl Vec3 {
    fn len(self) -> f32 {
        (self.x.powi(2) + self.y.powi(2) + self.z.powi(2)).sqrt()
    }

    fn normalize(self) -> Vec3 {
        let l = self.len();
        self / l
    }

    fn dot(self, v: Vec3) -> f32 {
        self.x * v.x + self.y * v.y + self.z * v.z
    }

    fn cross(self, v: Vec3) -> Vec3 {
        Vec3 {
            x: self.y * v.z - self.z * v.y,
            y: self.z * v.x - self.x * v.z,
            z: self.x * v.y - self.y * v.x
        }
    }

    fn reflect(self, v: Vec3) -> Vec3 {
        self - v * (2.0 * self.dot(v))
    }
}

impl Default for Vec3 {
    fn default() -> Self {
        Vec3 {
            x: 0.0,
            y: 0.0,
            z: 0.0
        }
    }
}



fn main() {
    let a = Vec3 { x: 1.0, y: 2.0, z: 3.0 };
    let b = Vec3 { x: 5.0, y: -1.0, z: 0.0 };
    let res = a + b;
    println!("{:?}", res);
    println!("{:?}", b);
    println!("{}", Vec3 { x: 5.0, y: 1.0, z: 3.0 }.len())
}
