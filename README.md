# Tweether ― Social Texting Platform
## Proje hakkında

Proje tech-stack olarak React/TypeScript kullanıyor. Kontratın derlenmesi için kontrat dosyası `src/contract/Tweether.sol` altında dosyasında oluşturulmalı. ABI kodunu derlemek için `npm run compile:contract` komutu gönderilmeli, komut gönderildiğinde ABI kodu `src/contract/Tweether.json` dosyası altında oluşacaktır. Kontrat adresi `.env` dosyasında `REACT_APP_CONTRACT_ADDRESS` ortam değişkeniyle tanımlanması gerekiyor.

Akıllı kontratları süren front-end uygulamalarında daha sağlıklı ve güvenli bir geliştirme ortamına sahip olmak için TypeScript kullanımının çok önemli olduğunu düşünüyorum. Tüm componentlerin olabildiğince interfacelerini yazmaya çalıştım. Akıllı kontratın instance'ı runtime üzerinde açığa çıktığı için methodların interfacelerini yazamıyordum, fakat bunun için ABI kodu üzerinden methodların girdi ve çıktılarına okuyarak interfaceleri otomatik olarak oluşturan ve uygulama tarafına bir factory contrat çıkaran [TypeChain](https://github.com/dethcrypto/TypeChain) paketini kullandım. ABI kodunda herhangi bir değişiklik yapılması durumunda `npm run typechain` komutunun çalıştırılarak interfacelerin güncellenmesi gerekmekte.

## Kontrat kodu hakkında

Kontrat koduna (`src/contract/Tweether.sol`) bakılacak olursa `tweets[]` dizisinin `private` olarak tanımlandığı görülecektir. Bu state değişkenini private yapmamın sebebi diziden veri çekilmek istendiğinde `getTweet()` metodunun kullanımına izin vermek. Çünkü `Tweet` structı içerisinde `likedBy` değerinin hesaplanması gerekiyor ve doğrudan state erişiminin olması durumunda bu hesaplamayı sağlanamıyor.

Struct yapısından bahsecek olursam, Tweet structı kendi arasında one-to-many ilişkisine sahip. Yapının ilişkisi diagram üzerinde [buradan](https://dbdiagram.io/d/633841a37b3d2034ff009027) görüntülenebilir.

## Projeyi koşmak

Öncelikle tüm bağımlılıklar yüklenmeli:

```bash
npm install
```

Bağımlılıkların yüklenmesi tamamlandıktan sonra proje ayağa kaldırılabilir:

```bash
npm start
```

`src/contract/Tweether.sol` dosyasında herhangi bir değişiklik yapılması durumunda ABI kodunun yeniden üretilmesi ve kontrat methodlarının interfacelerinin yeniden inşa edilmesi gerekmekte, bunun için aşağıdaki komut çalıştırılmalı. Bu komut `compile:contract` ve `compile:typechain` komutlarını tek seferde gönderecektir.

```bash
npm run compile
```

## Bağımlılıklar

- [React Blockies](https://www.npmjs.com/package/react-blockies)
- [dethcrypto/TypeChain](https://github.com/dethcrypto/TypeChain)
- [React Router v6](https://reactrouter.com/en/main)