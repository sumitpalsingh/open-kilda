/* Copyright 2017 Telstra Open Source
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

package org.openkilda.messaging.info.event;

import static com.google.common.base.MoreObjects.toStringHelper;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.openkilda.messaging.info.CacheTimeTag;

import java.util.Map;
import java.util.Objects;

/**
 * Defines the payload payload of a Message representing a switch info.
 */
@JsonSerialize
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "message_type",
        "switch_id",
        "state",
        "address",
        "hostname",
        "description",
        "controller"})
public class SwitchInfoData extends CacheTimeTag {
    /**
     * Serialization version number constant.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Switch id.
     */
    @JsonProperty("switch_id")
    private String switchId;

    /**
     * Switch ip address.
     */
    @JsonProperty("address")
    private String address;

    /**
     * Switch name.
     */
    @JsonProperty("hostname")
    private String hostname;

    /**
     * Switch description.
     */
    @JsonProperty("description")
    private String description;

    /**
     * Switch state.
     */
    @JsonProperty("state")
    private SwitchState state;

    /**
     * Switch state.
     */
    @JsonProperty("controller")
    private String controller;

    /**
     * Default constructor.
     */
    public SwitchInfoData() {
    }

    /**
     * Instance constructor.
     *
     * @param switchId    switch datapath id
     * @param state       switch state
     * @param address     switch ip address
     * @param hostname    switch name
     * @param description switch description
     * @param controller  switch controller
     */
    @JsonCreator
    public SwitchInfoData(@JsonProperty("switch_id") final String switchId,
                          @JsonProperty("state") final SwitchState state,
                          @JsonProperty("address") final String address,
                          @JsonProperty("hostname") final String hostname,
                          @JsonProperty("description") final String description,
                          @JsonProperty("controller") final String controller) {
        this.switchId = switchId;
        this.state = state;
        this.address = address;
        this.hostname = hostname;
        this.description = description;
        this.controller = controller;
    }

    /**
     * Instance constructor.
     *
     * @param map map with switch properties
     */
    public SwitchInfoData(Map<String, Object> map) {
        this.switchId = (String) map.get("switch_id");
        this.address = (String) map.get("address");
        this.hostname = (String) map.get("hostname");
        this.description = (String) map.get("description");
        this.state = SwitchState.valueOf((String) map.get("state"));
        this.controller = (String) map.get("controller");
    }


    /**
     * Returns switch id.
     *
     * @return switch id
     */
    public String getSwitchId() {
        return switchId;
    }

    /**
     * Sets switch id.
     *
     * @param switchId switch id to set
     */
    public void setSwitchId(final String switchId) {
        this.switchId = switchId;
    }

    /**
     * Returns switch state.
     *
     * @return switch state
     */
    public SwitchState getState() {
        return state;
    }

    /**
     * Sets switch state.
     *
     * @param state switch state to set
     */
    public void setState(final SwitchState state) {
        this.state = state;
    }

    /**
     * Gets switch ip address.
     *
     * @return switch ip address
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets switch ip address.
     *
     * @param address switch ip address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Gets switch hostname.
     *
     * @return switch hostname
     */
    public String getHostname() {
        return hostname;
    }

    /**
     * Sets switch hostname.
     *
     * @param hostname switch hostname
     */
    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    /**
     * Gets switch description.
     *
     * @return switch description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets switch description.
     *
     * @param description description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets switch controller.
     *
     * @return switch controller
     */
    public String getController() {
        return controller;
    }

    /**
     * Sets switch controller.
     *
     * @param controller switch controller
     */
    public void setController(String controller) {
        this.controller = controller;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return toStringHelper(this)
                .add("switch_id", switchId)
                .add("state", state)
                .add("address", address)
                .add("hostname", hostname)
                .add("description", description)
                .add("controller", controller)
                .toString();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return Objects.hash(switchId, state, address, hostname, description, controller);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }

        SwitchInfoData that = (SwitchInfoData) object;
        return Objects.equals(getSwitchId(), that.getSwitchId())
                && Objects.equals(getState(), that.getState())
                && Objects.equals(getAddress(), that.getAddress())
                && Objects.equals(getHostname(), that.getHostname())
                && Objects.equals(getDescription(), that.getDescription())
                && Objects.equals(getController(), that.getController());
    }
}
