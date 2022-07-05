package com.coursework.car.service;

import com.coursework.car.model.*;
import com.coursework.car.permission.OfferPermissionService;
import com.coursework.car.repositories.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private OfferPermissionService offerPermissionService;

    public List<OfferDto> getAllOffers() {
        return offerRepository.findAll().stream().map(this::toOfferDto).collect(Collectors.toList());
    }

    public OfferDto getOfferById(Long offerId) {
        Optional<Offer> foundOffer = offerRepository.findById(offerId);
        if (!foundOffer.isPresent()) {
            throw new RuntimeException();
        }

        return toOfferDto(foundOffer.get());
    }

    @PreAuthorize("#id == authentication.principal.id")
    public List<OfferDto> getOffersByUserId(Long id) {
        return offerRepository.findByUser_Id(id).stream().map(this::toOfferDto).collect(Collectors.toList());
    }

    @PreAuthorize("#newOffer.user.id == authentication.principal.id")
    public void saveOffer(OfferDto newOffer) {
        Offer savedOffer = offerRepository.save(newOffer.fromDto());
        offerPermissionService.addToStore(savedOffer.getUser(), savedOffer, "WRITE");
    }

    @Transactional
    @PreAuthorize("hasPermission(#id, 'com.coursework.car.model.Offer', 'WRITE')")
    public void deleteOffer(Long id) {
        Optional<Offer> optionalOffer = offerRepository.findById(id);
        if (!optionalOffer.isPresent()) {
            throw new RuntimeException();
        }
        offerPermissionService.removeFromStoreByOffer(optionalOffer.get());
        offerRepository.deleteById(id);
    }

    OfferDto toOfferDto(Offer offer) {
        CarDto carDto = toCarDto(offer.getCar());
        UserDto userDto = toUserDto(offer.getUser());
        return new OfferDto(offer.getId(), offer.getTown(), offer.getMinDays(), offer.getMaxDays(), offer.getDayCost(), carDto, userDto);
    }

    CarDto toCarDto(Car car) {
        return new CarDto(car.getId(), car.getModel(), car.getFuel(), car.isAutomatic(), car.getYear(), car.getAdditionalInformation());
    }

    UserDto toUserDto(User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhoneNumber());
    }
}
